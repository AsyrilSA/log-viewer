# Log Viewer (log-viewer)

Asyril Log Viewer

## TODO list

- [ ] try a html table instead of q-table in [LogTable.vue](/src/components/LogTable.vue) to increase performance
- [x] the select page is not overlayed on the side menu
- [ ] add loading element on loading of pages/table/charts
- [x] replace "undefined" loglevel by "system" ?
- [x] improve colors of loglevels : grey and lightgrey for trace and debug in [colorMixin.ts](src/mixins/colorsMixin.ts)
- [x] add a button to return to the top of the logs
- [x] add a button to delete all filters
- [x] improve logName display in the top bar
- [ ] add a filter like "go to first error"
- [x] implement the ci to deploy the logviewer on the asyril-registry server (port 8098)
- [ ] implement a general filter like gitlab, github or wireshark
- [x] permits to select a cell and set it as filter (CTRL + click)
- [x] display the metadata json
- [x] improve error management when something else than a eye+ log is imported
- [ ] tests (unit and e2e)
- [ ] push the project on github open source asyril account
- [ ] translation (i18n)
- [ ] add support for multiline log entry (currently one line in the file = one log entry)
- [x] remove menu title and add top space when collapsed
- [x] Remove title above log tables
- [ ] Optimize the import by extracting data during import and not on each page (move the informations in the logStore)
- [ ] Extract information from metadata and display them on the base page
- [ ] create a filter store to have the filters saved between pages
- [x] Correct filter height when selecting a log loglevel
- [ ] Add an option to go to page with the filter when clicking on a chart
- [ ] fix the column size of the q-table

## Development

### Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
num start
```

### Lint the files

```bash
npm run lint
```

### Format the files

```bash
npm run format
```

### Build the app for production

```bash
npm run build
```
