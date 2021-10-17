const noble = require('@abandonware/noble');

noble.on('stateChange', function (state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

//state = <"unknown" | "resetting" | "unsupported" | "unauthorized" | "poweredOff" | "poweredOn">

// noble.on('stateChange', callback(state));
//
// noble.on('scanStart', callback);
//
// async function init() {
//   console.log(1);
//   await sleep(1000);
//   console.log(2);
// }
//
// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }
//
// noble.on('scanStop', callback);

noble.on('discover', function (peripheral) {
  console.log(`peripheral discovered (${peripheral.id} with address <${peripheral.address}, ${peripheral.addressType}>, connectable ${peripheral.connectable}, RSSI ${peripheral.rssi}:`);
  //console.log('\thello my local name is:');
  //console.log(`\t\t${peripheral.advertisement.localName}`);
  //console.log('\tcan I interest you in any of the following advertised services:');
  //console.log(`\t\t${JSON.stringify(peripheral.advertisement.serviceUuids)}`);

  console.log(`Peripheral discovered at RSSI (${peripheral.rssi}`);

  // const serviceData = peripheral.advertisement.serviceData;
  // if (serviceData && serviceData.length) {
  //   console.log('\there is my service data:');
  //   for (const i in serviceData) {
  //     console.log(`\t\t${JSON.stringify(serviceData[i].uuid)}: ${JSON.stringify(serviceData[i].data.toString('hex'))}`);
  //   }
  // }
  // if (peripheral.advertisement.manufacturerData) {
  //   console.log('\there is my manufacturer data:');
  //   console.log(`\t\t${JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex'))}`);
  // }
  if (peripheral.advertisement.txPowerLevel !== undefined) {
    console.log('\tmy TX power level is:');
    console.log(`\t\t${peripheral.advertisement.txPowerLevel}`);
    console.log((Math.pow(10,(-20 + 4*(`${peripheral.advertisement.txPowerLevel}`-1) - `${peripheral.rssi}`)/20))/10000.00);





  }

  //noble.on('discover', callback(peripheral));

  console.log();
});
