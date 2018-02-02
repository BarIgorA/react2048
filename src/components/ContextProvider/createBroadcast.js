function createBroadcast(initialValue) {
  let currentValue = initialValue;
  let subscribers = [];

  const getValue = () => currentValue;

  const publish = state => {
    currentValue = state;
    subscribers.forEach(s => s(currentValue));
  };

  const subscribe = subscriber => {
    subscribers.push(subscriber);

    return () => {
      subscribers = subscribers.filter(s => s !== subscriber);
    };
  };

  return {
    getValue,
    publish,
    subscribe
  };
}

export default createBroadcast;
