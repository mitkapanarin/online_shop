<?php

namespace Core;

class Database
{
    private $mysqli;

    public function __construct()
    {
        $this->connect();
    }

    private function connect()
    {
        $this->mysqli = new \mysqli("3.239.119.81:3306", "root", "eDgK6EDreqkW0ZFs4kNTra69S651L1YMFrO5ORhKWJxUB2OvqHoS9xivmKv1cWrp", "shop_database");
        if ($this->mysqli->connect_error) {
            die("Connection failed: " . $this->mysqli->connect_error);
        }
    }

    public function query($sql)
    {
        return $this->mysqli->query($sql);
    }

    public function close()
    {
        $this->mysqli->close();
    }
}
