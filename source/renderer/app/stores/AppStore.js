// @flow
import { observable, computed, action } from 'mobx';
import { ipcRenderer, shell } from 'electron';
import Store from './lib/Store';
import LocalizableError from '../i18n/LocalizableError';
import { buildRoute } from '../utils/routing';
import { OPEN_ABOUT_DIALOG_CHANNEL } from '../../../common/ipc-api/open-about-dialog';

export default class AppStore extends Store {

  @observable error: ?LocalizableError = null;
  @observable isAboutDialogOpen = false;

  setup() {
    this.actions.router.goToRoute.listen(this._updateRouteLocation);
    this.actions.app.openAboutDialog.listen(this._openAboutDialog);
    this.actions.app.closeAboutDialog.listen(this._closeAboutDialog);
    ipcRenderer.on(OPEN_ABOUT_DIALOG_CHANNEL, this._openAboutDialog);
  }

  teardown() {
    ipcRenderer.removeListener(OPEN_ABOUT_DIALOG_CHANNEL, this._openAboutDialog);
  }

  @computed get currentRoute(): string {
    return this.stores.router.location.pathname;
  }

  openExternalLink(link: string): void {
    shell.openExternal(link);
  }

  _updateRouteLocation = (options: { route: string, params: ?Object }) => {
    const routePath = buildRoute(options.route, options.params);
    const currentRoute = this.stores.router.location.pathname;
    if (currentRoute !== routePath) this.stores.router.push(routePath);
  };

  @action _openAboutDialog = () => {
    this.isAboutDialogOpen = true;
  };

  @action _closeAboutDialog = () => {
    this.isAboutDialogOpen = false;
  };
}
