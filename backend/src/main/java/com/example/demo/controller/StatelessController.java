package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatelessController {

    @GetMapping("/public/hello")
    public String publicHello() {
        System.out.println("Hello from public API!");
        return "Hello from public API!";
    }

    @GetMapping("/secured/hello")
    public String securedHello() {
        System.out.println("Hello from secured API!");
        return "Hello from secured API!";
    }
}
