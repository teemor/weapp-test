require('../helpers/setup');

const wd = require('wd');

const serverConfig = {
  host: 'localhost',
  port: 4723
};

describe('sample test', function () {
  this.timeout(300000);

  let driver;
  let allPassed = true;

  before(function () {
    driver = wd.promiseChainRemote(serverConfig);
    require('../helpers/logging').configure(driver);
    
    let desired = {
      platformName: 'Android',
      deviceName: 'U2TDU15904014013',
      appPackage: 'com.tencent.mm', // 要运行的android应用程序包
      appActivity: '.ui.LauncherUI', // 你要等待的android应用程序的java包。默认情况下，此功能的值与for相同appActivity
      fullReset: false, 
      fastReset: false,
      noReset: true,
      chromeOptions: { // 允许为ChromeDriver传递chromeOptions功能。有关更多信息，请参阅chromeOptions
          androidProcess: 'com.tencent.mm:appbrand0',
      }
    }
    return driver
    .init(desired)
    .setImplicitWaitTimeout(8000);
  });
  after(function(){
    return driver
    .quit();
  });

  afterEach(function(){
    allPassed = allPassed && this.currentTest.state === 'passed'
  });

  it("进入微信首页",function(){
    return driver
    .elementByPath("//*[@text='登录']")
    .should.eventully.exits
    .click();
  })
})