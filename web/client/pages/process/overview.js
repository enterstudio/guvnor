var ProcessPage = require('../process'),
  templates = require('../../templates'),
  DetailsView = require('../../views/process/overview/running'),
  MemoryGraphView = require('../../views/process/overview/memory'),
  CpuGraphView = require('../../views/process/overview/cpu'),
  LatencyGraphView = require('../../views/process/overview/latency')

module.exports = ProcessPage.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name + ' - ' + this.model.status
  },
  template: templates.pages.process.overview,
  subviews: {
    details: {
      container: '[data-hook=details]',
      prepareView: function(el) {
        return new DetailsView({
          model: this.model,
          el: el
        })
      }
    },
    memory: {
      container: '[data-hook=memory]',
      prepareView: function(el) {
        return new MemoryGraphView({
          model: this.model,
          el: el
        })
      }
    },
    cpu: {
      container: '[data-hook=cpu]',
      prepareView: function(el) {
        return new CpuGraphView({
          model: this.model,
          el: el
        })
      }
    },
    latency: {
      container: '[data-hook=latency]',
      prepareView: function(el) {
        return new LatencyGraphView({
          model: this.model,
          el: el
        })
      }
    }
  }
})
