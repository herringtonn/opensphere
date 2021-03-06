goog.provide('plugin.file.shp.SHPPlugin');

goog.require('os.data.DataManager');
goog.require('os.data.ProviderEntry');
goog.require('os.file.FileManager');
goog.require('os.layer.config.LayerConfigManager');
goog.require('os.plugin.AbstractPlugin');
goog.require('os.ui.im.ImportManager');
goog.require('plugin.file.shp.SHPDescriptor');
goog.require('plugin.file.shp.SHPExporter');
goog.require('plugin.file.shp.SHPLayerConfig');
goog.require('plugin.file.shp.SHPParser');
goog.require('plugin.file.shp.SHPProvider');
goog.require('plugin.file.shp.type.DBFTypeMethod');
goog.require('plugin.file.shp.type.SHPTypeMethod');
goog.require('plugin.file.shp.type.ZipSHPTypeMethod');
goog.require('plugin.file.shp.ui.SHPImportUI');
goog.require('plugin.file.shp.ui.ZipSHPImportUI');



/**
 * Provides SHP support
 * @extends {os.plugin.AbstractPlugin}
 * @constructor
 */
plugin.file.shp.SHPPlugin = function() {
  plugin.file.shp.SHPPlugin.base(this, 'constructor');
  this.id = plugin.file.shp.SHPPlugin.ID;
};
goog.inherits(plugin.file.shp.SHPPlugin, os.plugin.AbstractPlugin);


/**
 * @type {string}
 * @const
 */
plugin.file.shp.SHPPlugin.ID = 'shp';


/**
 * @type {string}
 * @const
 */
plugin.file.shp.SHPPlugin.TYPE = 'SHP Layers';


/**
 * @inheritDoc
 */
plugin.file.shp.SHPPlugin.prototype.init = function() {
  var dm = os.dataManager;

  // register shp provider type
  dm.registerProviderType(new os.data.ProviderEntry(
      plugin.file.shp.SHPPlugin.ID,
      plugin.file.shp.SHPProvider,
      plugin.file.shp.SHPPlugin.TYPE,
      plugin.file.shp.SHPPlugin.TYPE,
      ''));

  // register the shp descriptor type
  dm.registerDescriptorType(this.id, plugin.file.shp.SHPDescriptor);

  // register the shp layer config
  var lcm = os.layer.config.LayerConfigManager.getInstance();
  lcm.registerLayerConfig('SHP', plugin.file.shp.SHPLayerConfig);

  // register the shp file type method
  var fm = os.file.FileManager.getInstance();
  fm.registerContentTypeMethod(new plugin.file.shp.type.SHPTypeMethod());
  fm.registerContentTypeMethod(new plugin.file.shp.type.DBFTypeMethod());
  fm.registerContentTypeMethod(new plugin.file.shp.type.ZipSHPTypeMethod());

  // register the shp import ui
  var im = os.ui.im.ImportManager.getInstance();
  im.registerImportDetails('Shapefile (SHP/DBF or ZIP)', true);
  im.registerImportUI('shp', new plugin.file.shp.ui.SHPImportUI());
  im.registerImportUI('zipshp', new plugin.file.shp.ui.ZipSHPImportUI());
  im.registerParser('shp', plugin.file.shp.SHPParser);

  // register the shp exporter
  os.ui.exportManager.registerExportMethod(new plugin.file.shp.SHPExporter());
};
