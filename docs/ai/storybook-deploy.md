# Публикация Storybook на VPS

Основной сервер `storybook.triplex-dev.ru` принимает архив готовой сборки через
ограниченный SSH-ключ. `scripts/deploy/storybook.sh` проверяет имя канала и ключ
сервера; `scripts/deploy/storybook-receive.py` установлен администратором как
`/usr/local/libexec/triplex/storybook-deploy.py` и запускается принудительно из
`authorized_keys` пользователя `storybook-deploy` с опцией `restrict`.

Основной сервер использует secrets `STORYBOOK_SSH_PRIVATE_KEY_TRIPLEX_DEV`,
`STORYBOOK_SSH_USER_TRIPLEX_DEV` (полный user@host) и
`STORYBOOK_SSH_KNOWN_HOSTS_TRIPLEX_DEV`. Версионный workflow использует тот же
доступ в прежних `STORYBOOK_SSH_PRIVATE_KEY` и `STORYBOOK_SSH_USER`.
Секреты зеркала triplex-design не меняются.

Принимающий пользователь имеет запись только в каталогах Storybook, без sudo и
Docker. Доступны команды `deploy CHANNEL SHA` и `remove pr-N`. Архив не может
содержать ссылки, абсолютные пути или выход из каталога. Для публикации обязательны
index.html, iframe.html и index.json. Незавершённая загрузка не меняет текущую версию.

Сборки хранятся в `/srv/triplex/storybook/channels/CHANNEL`; ссылка
`/var/www/storybook/data/CHANNEL` переключается атомарно после проверки архива.
Сохраняются три полные сборки. Хешированные чанки накапливаются в
`/var/www/storybook/shared/CHANNEL`, чтобы уже открытые вкладки продолжали работать.
Nginx обслуживает `/<channel>/assets/` из этого общего каталога с immutable cache;
HTML и индекс перевалидируются. Чанки не удаляются вместе со старой сборкой;
объём shared следует контролировать при обслуживании VPS. Закрытие PR удаляет
только его preview и общие чанки этого preview.

Изменения main и release-* запускают публикацию ветки, PR публикуют pr-N,
release workflow — releases/vX.Y.Z. Основной сервер обязателен для успешного
деплоя main; второе зеркало публикуется независимо. Доступ форкам и Dependabot
к ключам preview по-прежнему не предоставляется.

Проверки: `python3 -m unittest discover -s scripts/deploy -p 'test_*.py'`,
`bash -n scripts/deploy/storybook.sh` и actionlint для изменённых workflow.
Изменения workflow должны попасть в release-0 обычным ручным перелитием main:
до этого старая ветка использует прежний протокол SSH и не сможет обновить новый VPS.
