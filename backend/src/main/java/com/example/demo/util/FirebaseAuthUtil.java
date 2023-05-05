package com.example.demo.util;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import java.util.concurrent.ExecutionException;

public class FirebaseAuthUtil {

    public static FirebaseToken verifyIdToken(String idToken) {
        try {
            return FirebaseAuth.getInstance().verifyIdTokenAsync(idToken).get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error verifying ID token", e);
        }
    }
}
