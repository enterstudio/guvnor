var expect = require('chai').expect,
  sinon = require('sinon'),
  inherits = require('util').inherits,
  UserRPC = require('../../../../lib/daemon/rpc/UserRPC'),
  EventEmitter = require('events').EventEmitter

describe('UserRPC', function () {

  it('should expose user methods', function () {
    var rpc = new UserRPC()
    rpc._processFactory = {
      connect: sinon.stub()
    }
    rpc._guvnor = {
      on: sinon.stub(),
      startProcess: sinon.stub(),
      listProcesses: sinon.stub(),
      findProcessInfoById: sinon.stub(),
      findProcessInfoByPid: sinon.stub(),
      findProcessInfoByName: sinon.stub(),
      findAppById: sinon.stub(),
      findAppByName: sinon.stub(),
      deployApplication: sinon.stub(),
      removeApplication: sinon.stub(),
      listApplications: sinon.stub(),
      switchApplicationRef: sinon.stub(),
      listApplicationRefs: sinon.stub(),
      updateApplicationRefs: sinon.stub(),
      removeProcess: sinon.stub(),
      listUsers: sinon.stub(),
      currentRef: sinon.stub(),
      stopProcess: sinon.stub()
    }
    rpc._processService = {
      on: sinon.stub()
    }
    rpc._appService = {
      on: sinon.stub()
    }
    rpc._config = {
      guvnor: {}
    }
    rpc._fileSystem = {
      getRunDir: sinon.stub()
    }
    rpc._dnode = sinon.stub()
    rpc._fs = {
      existsSync: sinon.stub(),
      unlinkSync: sinon.stub(),
      chown: sinon.stub(),
      exists: sinon.stub()
    }
    rpc._logger = {
      info: sinon.stub(),
      warn: sinon.stub(),
      error: sinon.stub(),
      debug: sinon.stub()
    }

    var socket = new EventEmitter()
    var dnode = new EventEmitter()
    dnode.listen = sinon.stub()
    dnode.listen.returns(socket)
    rpc._dnode.returns(dnode)

    rpc.afterPropertiesSet()

    expect(rpc.startProcess).to.be.a('function')
    expect(rpc.listProcesses).to.be.a('function')
    expect(rpc.findProcessInfoById).to.be.a('function')
    expect(rpc.findProcessInfoByPid).to.be.a('function')
    expect(rpc.deployApplication).to.be.a('function')
    expect(rpc.removeApplication).to.be.a('function')
    expect(rpc.listApplications).to.be.a('function')
    expect(rpc.switchApplicationRef).to.be.a('function')
    expect(rpc.listApplicationRefs).to.be.a('function')
    expect(rpc.updateApplicationRefs).to.be.a('function')
    expect(rpc.listUsers).to.be.a('function')
    expect(rpc.currentRef).to.be.a('function')
    expect(rpc.stopProcess).to.be.a('function')
  })
})
