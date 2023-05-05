package com.example.demo.util;

import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class FirebaseAuthFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException {
        String idToken = request.getHeader("Authorization").split(" ")[1];

        if (idToken != null) {
            try {
                FirebaseToken decodedToken = FirebaseAuthUtil.verifyIdToken(idToken);
                AbstractAuthenticationToken auth = new UsernamePasswordAuthenticationToken(decodedToken.getUid(), null);
                SecurityContextHolder.getContext().setAuthentication(auth);
                filterChain.doFilter(request, response); // Returns empty otherwise
            } catch (RuntimeException | ServletException e) {
                System.out.println("Error verifying ID token: " + e.getMessage());
                SecurityContextHolder.clearContext();
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
            }

        }
    }

//    private final RequestMatcher uriMatcher = new AntPathRequestMatcher("/public", HttpMethod.GET.name());
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) {
//        RequestMatcher matcher = new NegatedRequestMatcher(uriMatcher);
//        return matcher.matches(request);
//    }
}
