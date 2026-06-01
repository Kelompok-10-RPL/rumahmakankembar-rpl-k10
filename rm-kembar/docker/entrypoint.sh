#!/bin/sh
set -e

echo "==> Waiting for MySQL to be ready..."
until php -r "
    try {
        new PDO(
            'mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
            getenv('DB_USERNAME'),
            getenv('DB_PASSWORD')
        );
        echo 'ok';
    } catch (Exception \$e) {
        exit(1);
    }
" 2>/dev/null; do
    echo "    MySQL not ready yet, retrying in 3s..."
    sleep 3
done
echo "==> MySQL is ready."

echo "==> Running migrations..."
php artisan migrate --force

echo "==> Seeding database (only on fresh install)..."
USER_COUNT=$(php -r "
    \$pdo = new PDO(
        'mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
        getenv('DB_USERNAME'),
        getenv('DB_PASSWORD')
    );
    echo \$pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();
")
if [ "$USER_COUNT" -eq "0" ]; then
    echo "    Fresh database detected — running seeders..."
    php artisan db:seed --force
    echo "    Seeding complete."
else
    echo "    Database already has data (${USER_COUNT} users) — skipping seed."
fi

echo "==> Optimizing Laravel (config + routes + views)..."
php artisan optimize

echo "==> Linking storage..."
php artisan storage:link --force 2>/dev/null || true

echo "==> Fixing storage permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

echo "==> Starting PHP-FPM..."
exec php-fpm
