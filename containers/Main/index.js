import React, { useState, useEffect } from 'react';
import AppNavigator from '../../navigators/AppNavigator';
import Loading from '../../components/Loading';

function Main(props) {
  const [isLoading, load] = useState(true);

  useEffect(() => {
    load(false);
  }, []);

  if (isLoading) {
    return <Loading />
  } else {
    return <AppNavigator />
  }
}

export default Main;