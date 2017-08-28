import angular from 'angular';
import AggregateService from './contact-group.aggregate-service';
import OrderService from './contact-group.order-service';
import contactGroupComponent from './contact-group.component';

export default angular
    .module('app.contact-group', [])
    .component('contactGroup', contactGroupComponent)
    .service('contactGroupAggregateService', AggregateService)
    .service('contactGroupOrderService', OrderService)
    .name;
