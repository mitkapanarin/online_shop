<?php

use GraphQL\Type\Schema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\GraphQL;
use GraphQL\Error\DebugFlag;

class GraphQLController
{
  public function index()
  {
    $schema = new Schema([
      'query' => new ObjectType([
        'name' => 'Query',
        'fields' => [
          'hello' => [
            'type' => Type::string(),
            'resolve' => function () {
              return 'Hello, World! xxxxxxx';
            }
          ]
        ]
      ])
    ]);

    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $query = $input['query'];
    $variableValues = isset($input['variables']) ? $input['variables'] : null;

    try {
      $result = GraphQL::executeQuery(
        $schema,
        $query,
        null,
        null,
        $variableValues
      );
      $output = $result->toArray(DebugFlag::INCLUDE_DEBUG_MESSAGE);
    } catch (\Exception $e) {
      $output = [
        'error' => [
          'message' => $e->getMessage()
        ]
      ];
    }

    header('Content-Type: application/json');
    echo json_encode($output);
  }
}

// Usage
$controller = new GraphQLController();
$controller->index();
