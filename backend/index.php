<?php

require 'vendor/autoload.php';

use FastRoute\RouteCollector;

// Add the namespace for your controllers
spl_autoload_register(function ($class) {
  $file = __DIR__ . '/src/controllers/' . str_replace('\\', '/', $class) . '.php';
  if (file_exists($file)) {
    require $file;
  }
});

$dispatcher = FastRoute\simpleDispatcher(function (RouteCollector $r) {
  $r->addRoute('GET', '/', 'HomeController@index');
  $r->addRoute('GET', '/about', 'AboutController@index');
  $r->addRoute('POST', '/graphql', 'GraphQLController@index');
  // Add more routes here
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
  case FastRoute\Dispatcher::NOT_FOUND:
    http_response_code(404);
    echo '404 Not Found';
    break;
  case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
    $allowedMethods = $routeInfo[1];
    http_response_code(405);
    echo '405 Method Not Allowed';
    break;
  case FastRoute\Dispatcher::FOUND:
    $handler = $routeInfo[1];
    $vars = $routeInfo[2];
    [$class, $method] = explode('@', $handler);
    call_user_func_array([new $class(), $method], $vars);
    break;
}
