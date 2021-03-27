package org.kodejava.example.httpclient;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HeadRequestExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newBuilder().build();

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://google.com"))
            .method("HEAD", HttpRequest.BodyPublishers.noBody())
            .build();

        HttpResponse<Void> response = client.send(request,
            HttpResponse.BodyHandlers.discarding());

        // Returns an unmodifiable multi map view of this HttpHeaders.
        // The map contains key of string, with list of strings as
        // its value.
        HttpHeaders headers = response.headers();
        headers.map().forEach((key, values) ->
            System.out.printf("%s = %s%n", key, values));
    }
}

// source: https://kodejava.org/category/java/http-client/