package com.commercebank.appointment_booking.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebConfig {

    @RequestMapping(value = {
            "/",
            "/step/**",
            "/booking/**",
            "/confirmation/**",
            "/success/**"
    })
    public String forward(HttpServletRequest request) {
        return "forward:/index.html";
    }
}