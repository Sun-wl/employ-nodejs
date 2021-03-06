// lazyload config
var ctx = "/employment/";
angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['framework/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['framework/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['framework/jquery/charts/flot/jquery.flot.min.js',
                          'framework/jquery/charts/flot/jquery.flot.resize.js',
                          'framework/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          'framework/jquery/charts/flot/jquery.flot.spline.js',
                          'framework/jquery/charts/flot/jquery.flot.orderBars.js',
                          'framework/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['framework/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['framework/jquery/sortable/jquery.sortable.js'],
      nestable:       ['framework/jquery/nestable/jquery.nestable.js',
                          'framework/jquery/nestable/nestable.css'],
      filestyle:      ['framework/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['framework/jquery/slider/bootstrap-slider.js',
                          'framework/jquery/slider/slider.css'],
      chosen:         ['framework/jquery/chosen/chosen.jquery.min.js',
                          'framework/jquery/chosen/chosen.css'],
      TouchSpin:      ['framework/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'framework/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['framework/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'framework/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['framework/jquery/datatables/jquery.dataTables.min.js',
                          'framework/jquery/datatables/dataTables.bootstrap.js',
                          'framework/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['framework/jquery/jvectormap/jquery-jvectormap.min.js',
                          'framework/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          'framework/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          'framework/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['framework/jquery/footable/footable.all.min.js',
                          'framework/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      'framework/modules/ng-grid/ng-grid.min.js',
                      'framework/modules/ng-grid/ng-grid.min.css',
                      'framework/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      'framework/modules/angular-ui-select/select.min.js',
                      'framework/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    'framework/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['framework/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      'framework/modules/ngImgCrop/ng-img-crop.js',
                      'framework/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      'framework/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      'framework/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      'framework/modules/angularjs-toaster/toaster.js',
                      'framework/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      'framework/modules/textAngular/textAngular-sanitize.min.js',
                      'framework/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      'framework/modules/angular-slider/angular-slider.min.js',
                      'framework/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      'framework/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      'framework/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      'framework/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      'framework/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      'framework/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      'framework/modules/videogular/plugins/ima-ads.min.js'
                  ]
              }
          ]
      });
  }])
;