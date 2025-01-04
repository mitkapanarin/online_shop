<?php

namespace Controllers;

use Core\Controller;
use Core\Database;

class HomeController extends Controller
{
    private $db;

    public function __construct(Database $db)
    {
        parent::__construct();
        $this->db = $db;
    }

    public function index()
    {
        $this->json(['message' => 'Welcome to the home page!']);
    }
}
