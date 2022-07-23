import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib({ REACH_NO_WARN: 'Y' });
const standardBalance = stdlib.parseCurrency(100);
const accAlice = await stdlib.newTestAccount(standardBalance);

const ctcAlice = accAlice.contract(backend);

const users = await stdlib.newTestAccounts(10, standardBalance);
const ctcWho = (whoi) =>
  users[whoi].contract(backend, ctcAlice.getInfo());
const attachers =[];
const userAdd = async (whoi) => {
  const who = users[whoi];
  const ctc = ctcWho(whoi);
  const accepted = await ctc.apis.Bob.usersBobs();
 
 if (accepted) {
  console.log(stdlib.formatAddress(who), ' SEES CONGRATULATIONS SUCCESSFUL ATTACH ');
  attachers.push(who.getAddress());
}
  
  else{
    console.log(stdlib.formatAddress(who), '  SEES SORRY THE LIST IS FULL ');
  } 
}
await Promise.all([
  backend.Alice(ctcAlice, {
    ready : () => {
        console.log('Alice is ready for the attachers')
    },
    adminBlock : (add) => {
        console.log('ADMIN BLOCK........................')
        console.log(stdlib.formatAddress(add) ,'has been added to the list')
        



    }

  }),

await userAdd(0),
await userAdd(1),
await userAdd(2),
await userAdd(3),
await userAdd(4),
await userAdd(5),
await userAdd(6),
await userAdd(7),
await userAdd(8),
await userAdd(9),
console.log(attachers)
]);