# Публикация Storybook на VPS

## Граница доверия

`storybook-preview.yml` и `storybook-release-branches.yml` только собирают
Storybook и сохраняют `storybook.tar.gz` в GitHub Artifacts. В них нет SSH-ключей,
SSH-agent, записи в PR и серверных команд. `release.yml` тоже передаёт готовый
Storybook через артефакт, отдельно от публикации npm.

`storybook-publish.yml` запускается через `workflow_run` из доверенного `main`.
Он не делает checkout ветки PR, не устанавливает её зависимости и не выполняет
файлы из артефакта. На чистом runner используется код из `github.workflow_sha`;
входящий архив передаётся на сервер как данные. Закрытие PR обрабатывается через
`pull_request_target: closed`, также без checkout или выполнения кода PR.

`scripts/deploy/storybook-publication.cjs` сверяет источник прогона, репозиторий,
workflow, состояние и SHA PR, текущую вершину публикуемой ветки. Имя артефакта
не является разрешением на публикацию. Для релизов дополнительно проверяются
тег и принадлежность коммита ветке main/release-0. После ожидания очереди
проверка повторяется, чтобы устаревший PR не перезаписал свежий preview.

Основные каналы: `main`, `release-0`, `releases/0.Y.0`, `releases/1.Y.0`.
Preview: `pr-N`, только для открытых PR в main из этого репозитория, кроме
Dependabot и prerelease-веток. Публикация выполняется отдельным прогоном
**Publish Storybook**; зелёная сборка сама по себе ещё не означает успешный деплой.
Новый publisher начнёт автоматически запускаться после слияния его файла в main.

## Ключи и окружения GitHub

Созданы `storybook-production` и `storybook-preview`; оба разрешают только ref
ветки `main`. Разные значения ключей хранятся только в этих environments:

- `STORYBOOK_SSH_PRIVATE_KEY_TRIPLEX_DEV`, `STORYBOOK_SSH_USER_TRIPLEX_DEV`,
  `STORYBOOK_SSH_KNOWN_HOSTS_TRIPLEX_DEV`;
- `STORYBOOK_SSH_PRIVATE_KEY_TRIPLEX_DESIGN`, `STORYBOOK_SSH_USER_TRIPLEX_DESIGN`,
  `STORYBOOK_SSH_KNOWN_HOSTS_TRIPLEX_DESIGN`.

Дубликатов этих секретов на уровне репозитория нет. Прежние
`STORYBOOK_SSH_PRIVATE_KEY` и `STORYBOOK_SSH_USER` больше не используются.
Ключи обоих серверов проверяются через known_hosts, без отключения проверки SSH.

Каждый ключ в authorized_keys имеет `restrict` и принудительную команду
`storybook-deploy.py production` или `storybook-deploy.py preview`.
Production-ключ не может менять preview; preview-ключ — основные ветки и релизы.
Оба ключа не дают произвольный shell. Принимающий пользователь не имеет sudo.
Отдельный личный ключ обслуживания не хранится в GitHub.

На основном VPS приёмник установлен администратором:
`/usr/local/libexec/triplex/storybook-deploy.py`, владелец root. Настройки SSH
также принадлежат root, а пользователь публикации может только читать их.
Изменения Python-файла в репозитории автоматически на сервер не устанавливаются:
после ревью администратор отдельно обновляет приёмник и сверяет SHA-256.

На зеркале используется тот же файл с дополнительным аргументом `mirror`,
установленный в `/var/www/storybook/data/.ssh/storybook-deploy.py`.
Каталог .ssh доступен только пользователю storybook; ключи публикации не дают
команд для изменения приёмника. Личное обслуживание выполняется отдельным ключом.

## Архивы и сохранение чанков

Приёмник принимает только обычные файлы/каталоги, запрещает ссылки, абсолютные
пути, выход из каталога и повторяющиеся пути. Лимит: 300 MiB распакованных файлов
и 20 000 элементов. Обязательны index.html, iframe.html, index.json.
Публикации защищены общей блокировкой; ссылка на сайт переключается после проверки.
Сохраняются три полные сборки и старые хешированные assets.

На основном VPS сборки расположены в `/srv/triplex/storybook/channels/CHANNEL`,
публичные ссылки — `/var/www/storybook/data/CHANNEL`, чанки —
`/var/www/storybook/shared/CHANNEL`. Nginx обслуживает общий каталог assets.

На зеркале состояние хранится в `/var/www/storybook/data/.storybook-releases`.
Перед первым запуском существующие каталоги каналов один раз переносятся в
`.storybook-releases/channels/<channel>/before-security`, assets копируются в
`.storybook-releases/shared/<channel>`, а прежний путь заменяется ссылкой.
На текущем зеркале эта миграция выполнена; новый приёмник не заменяет обычный
каталог ссылкой автоматически. Каталог состояния создаётся до открытия блокировки.
Старые чанки копируются и в новую сборку, поэтому изменение Nginx не требуется.
Удаление preview удаляет только соответствующий `pr-N` и его сохранённые файлы.
Накопление чанков требует контроля свободного места на обоих серверах.

## Проверки и ревью

- `python3 -m unittest discover -s scripts/deploy -p 'test_*.py'` — архивы,
  права ключей, публикация и очистка.
- `node --test scripts/deploy/test-storybook-publication.cjs` — разрешения
  по данным GitHub, подмена канала, устаревшие PR, чужие репозитории и теги.
- `bash -n scripts/deploy/storybook.sh scripts/deploy/storybook-remove.sh`.
- actionlint для workflow. Версия 1.7.12 пока не распознаёт `concurrency.queue`,
  хотя [GitHub поддерживает `queue: max`](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency).
  Для этой версии используй точечное исключение:
  `actionlint -ignore 'unexpected key "queue" for "concurrency" section'`.
  Когда линтер добавит поддержку `queue`, исключение можно убрать.
- **Python security** запускает CodeQL security-extended и блокирует проверку
  при находках. SARIF доступен как артефакт `python-security-report`.
  Стандартный CodeQL продолжает проверять Actions и JavaScript/TypeScript.
  Отдельный Python gate нужен уже в этом PR: default setup не позволяет выбрать
  язык, пока его нет в main, и не принимает SARIF от advanced setup.

CODEOWNERS требует ревью @dudim для scripts/deploy, workflow и самого CODEOWNERS.
На main новые коммиты сбрасывают одобрение; перед слиянием ветка должна быть
актуальна относительно main. Защита распространяется на администраторов, исключение бота из ревью удалено.
Еженедельный релиз теперь ждёт человеческого одобрения PR; обход защиты не нужен.
Подготовка и завершение слияния разделены: повтор завершения после сетевой ошибки
не делает новый бамп и сначала обрабатывает уже слитый PR.
До слияния обновлённого release-weekly.yml старый Weekly release отключён, чтобы
он не опубликовал только React 17-половину перед отказом в push в main.
После слияния мейнтейнер включает Weekly release и выполняет dry_run.

Изменения workflow и скриптов следует перенести из main в release-0 обычным
ручным перелитием. Пока PR не слит, прежние workflow лишены старых ключей и не
обновляют серверы; опубликованная статика продолжает работать.

Эти меры ограничивают ключи Storybook. Они не делают произвольный код безопасным:
JS внутри preview выполняется в браузере посетителя. Секреты автоматизации
репозитория и npm — отдельная область; их доступы не заменяются SSH-окружениями.
