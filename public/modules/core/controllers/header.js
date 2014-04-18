'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
    function ($scope, Authentication) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;

        $scope.menu = [{
            title: 'Articles',
            link: 'articles',
            route: '/articles'
        }, {
            title: 'New Article',
            link: 'articles/create',
            route: '/articles/create'
        }];

        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };
    }
]);
