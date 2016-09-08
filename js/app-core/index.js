import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';

import config from './config';

angular
  .module('app.core', ['ui.router'])
  .config(config)
;