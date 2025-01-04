<?php

namespace Core;

use FastRoute\Dispatcher;
use FastRoute\RouteCollector;

class Router
{
    private $dispatcher;
    private $db;

    public function __construct()
    {
        $this->db = new Database();
        $this->dispatcher = \FastRoute\simpleDispatcher(function (RouteCollector $r) {
            $r->addRoute('GET', '/', 'HomeController@index');
            $r->addRoute('GET', '/about', 'AboutController@index');
            $r->addRoute('POST', '/graphql', 'GraphQLController@index');
        });
    }

    public function dispatch($httpMethod, $uri)
    {
        $routeInfo = $this->dispatcher->dispatch($httpMethod, $uri);

        switch ($routeInfo[0]) {
            case Dispatcher::NOT_FOUND:
                http_response_code(404);
                echo '404 Not Found';
                break;

            case Dispatcher::METHOD_NOT_ALLOWED:
                http_response_code(405);
                echo '405 Method Not Allowed';
                break;

            case Dispatcher::FOUND:
                $handler = $routeInfo[1];
                $vars = $routeInfo[2];
                [$class, $method] = explode('@', $handler);
                $fullClassName = "Controllers\\$class";

                if (class_exists($fullClassName) && method_exists($fullClassName, $method)) {
                    $controller = new $fullClassName($this->db);
                    call_user_func_array([$controller, $method], $vars);
                } else {
                    http_response_code(500);
                    echo '500 Internal Server Error';
                }
                break;
        }
    }

    public function __destruct()
    {
        $this->db->close();
    }
}
