---
name: release-auto
description: Отчёт о еженедельном релизе triplex-next — читает результат прогона release-weekly.yml, сверяет версии и dist-tags, публикует резюме в задачу Linear и отдельно называет аномалии. Ничего не выпускает: релиз целиком делает GitHub Actions по расписанию.
---

# release-auto

Отчётный skill для еженедельной cloud-routine. **Ничего не публикует и не пишет
в GitHub** — только читает результат и рассказывает о нём человеку.

Сам релиз делает [`release-weekly.yml`](../../../.github/workflows/release-weekly.yml)
по расписанию GitHub (пятница 13:00 МСК). Routine запускается после него.

## Почему релиз не здесь

Прокси облачных сессий режет write-пути `api.github.com`: `gh release create`,
`gh workflow run`, создание и push тегов — всё возвращает
`Write access to this GitHub API path is not permitted through this proxy`.
Три прогона подряд (TRI-113, TRI-116, TRI-118) упирались в это на разных шагах.

Изнутри Actions ограничений нет, поэтому механика живёт там, а расписание
держит сам GitHub. Не пытайся выпускать релиз отсюда — не получится, и это
не баг окружения, а его устройство.

## Что делать

### 1. Найти прогон

```bash
gh run list --workflow=release-weekly.yml --limit 1 \
  --json databaseId,status,conclusion,createdAt,url
```

Прогона за сегодня нет — так и скажи: расписание не сработало, это повод
проверить `release-weekly.yml`, а не выпускать релиз руками.

### 2. Определить исход

```bash
gh run view <RUN_ID> --json jobs \
  --jq '.jobs[] | "\(.name): \(.status)/\(.conclusion)"'
```

| Что видно | Исход |
|---|---|
| `preflight` успешен, остальные `skipped` | Релиза не было штатно — подготовка не завершена или выпускать нечего |
| Все джобы успешны | Релиз выпущен целиком |
| `publish-react17` успешен, дальше провал | **Авария** — см. ниже |
| `preflight` провалился | Поломка самого workflow |

Причину штатного пропуска бери из summary прогона — там она написана словами:

```bash
gh run view <RUN_ID> --log | grep -A5 "Релиза не будет"
```

### 3. Сверить состояние

```bash
git fetch origin main release-0
git show origin/main:package.json | grep -m1 '"version"'
git show origin/release-0:package.json | grep -m1 '"version"'
npm view @sberbusiness/triplex-next dist-tags --json
gh release view <VERSION> --json assets --jq '.assets[].name'
```

Ожидается: миноры веток совпадают, `dist-tags.latest` = `1.Y.0`, в релизе
`1.Y.0` лежат `dist-<VERSION>.zip` и `mcp-data-<VERSION>.json`.

`dist-tags.react17` **не проверяй** — тег не поддерживается, теги во внутренний
registry не проносятся.

### 4. Отчёт в Linear

Найди задачу «Релиз `1.Y.0` / `0.Y.0`» через Linear MCP; если её нет, а релиз
состоялся — заведи через skill `create-task`. Опубликуй комментарий: что
выпущено, ссылки на релизы, подтверждение `dist-tags.latest`, ссылки на
Storybook, наличие ассета для MCP-сервера.

Если релиза не было штатно — короткий комментарий не нужен, достаточно
финального ответа в сессии. Задачу в этом случае не заводи.

## Аномалии — называй первой строкой

**`latest` на `0.x`.** Значит `0.Y.0` опубликована, а `1.Y.0` нет, и
`npm install @sberbusiness/triplex-next` отдаёт всем React 17-сборку. Это
авария, а не «половина релиза». Почини её нельзя из облака — сообщи и дай
человеку команду:

```bash
npm dist-tag add @sberbusiness/triplex-next@<последняя 1.x> latest
```

Либо довыпустить `1.Y.0` — тогда `latest` встанет сам.

**Релиз `1.Y.0` без `mcp-data-<VERSION>.json`.** MCP-сервер не сможет
синхронизироваться своим `sync-bundle.yml`. Сообщи, шаг `Generate MCP bundle`
не отработал.

**Прогон упал после публикации.** Версия в npm уже есть и отозвать её нельзя.
Скажи, что именно опубликовано, и что прогон можно перезапустить — публикация
идемпотентна.

## Жёсткие ограничения

- Ничего не публиковать и не пушить: релиз делает GitHub Actions.
- Не трогать `dist-tags` — только сообщать.
- Не заводить задачу Linear, если релиза не было.
- Не выдумывать причину пропуска: она написана в summary прогона.
