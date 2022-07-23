"reach 0.1";

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    ready: Fun([], Null),
    adminBlock: Fun([Address],Null)
  });

  const Bob = API('Bob', {
    usersBobs: Fun([], Bool ),
  });

  init();

 Alice.only(() => {
    interact.ready();
   
  });
  Alice.publish();

    commit(); 
  Alice.publish();
  const [userBobs] =
    parallelReduce([1])
    .invariant(balance() == 0)
    .while( userBobs > 0 )
    .api_(Bob.usersBobs, () => {
      check( this != Alice, "you are the user");
      return [ 0, (k) => {
        if(userBobs <=  5){
          Alice.interact.adminBlock(this);
          k(true);
        }
        else{
          k(false);
        }
        return [ userBobs + 1];
      }];
    })
  commit();
  exit();
});