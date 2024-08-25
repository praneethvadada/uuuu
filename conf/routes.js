

export const printRoutes = (app) => {
  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Route has a path and method(s)
      const methods = Object.keys(middleware.route.methods).map(method => method.toUpperCase());
      routes.push({
        path: middleware.route.path,
        methods,
      });
    } else if (middleware.name === 'router') {
      // It's a router middleware, iterate over its stack to find routes
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).map(method => method.toUpperCase());
          routes.push({
            path: handler.route.path,
            methods,
          });
        }
      });
    }
  });

  console.log('Available Routes:');
  routes.forEach((route) => {
    console.log(`${route.methods.join(', ')}: ${route.path}`);
  });
};

export default printRoutes;
