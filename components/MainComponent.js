import React, { useState, useEffect, Suspense, lazy } from 'react';
import AppNavigator from '../navigators/AppNavigator';
import Loading from './LoadingComponent';

function Main() {
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