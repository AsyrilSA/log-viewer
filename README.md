# Log Viewer (log-viewer)

Asyril Log Viewer

## TODO list

- [ ] try a html table instead of q-table in [LogTable.vue](/src/components/LogTable.vue) to increase performance
- [x] the select page is not overlayed on the side menu
- [ ] add loading element on loading of pages/table/charts
- [x] replace "undefined" loglevel by "system" ?
- [ ] improve colors of loglevels : grey and lightgrey for trace and debug in [colorMixin.ts](src/mixins/colorsMixin.ts)
- [ ] add a button to return to the top of the logs
- [x] add a button to delete all filters
- [x] improve logName display in the top bar
- [ ] add a filter like "go to first error"
- [ ] implement the ci to deploy the logviewer on the asyril-registry server (port to be defined)
- [ ] implement a general filter like gitlab, github or wireshark
- [ ] permits to select a cell and set it as filter (right click or keyboard shortcut)
- [x] display the metadata json
- [ ] improve error management when something else than a eye+ log is imported
- [ ] tests (unit and e2e)
- [ ] push the project on github open source asyril account
- [ ] translation (i18n)



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
