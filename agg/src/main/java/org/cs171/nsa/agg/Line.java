/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cs171.nsa.agg;

import java.util.Objects;

/**
 *
 * @author sdube
 */
public class Line {

    private String country, state, city;
    private Float lat, lng;
    private String isp, userAgent;
    private String browser, browserVersion, os;

    public Line(String line) {
        String[] tokens = line.split("\\,", 11);
        if (tokens.length == 11) {
            country = tokens[1];
            // some states might be undefined
            state = parse(tokens[2]);
            city = parse(tokens[3]);
            if (city.equals("-")) {
                throw new IllegalArgumentException("Need city!");
            }

            lat = Float.valueOf(tokens[4]);
            lng = Float.valueOf(tokens[5]);

            isp = parse(tokens[6]);
            userAgent = parse(tokens[7]);
            browser = parse(tokens[8]);
            browserVersion = parse(tokens[9]);
            os = parse(tokens[10]);
        } else {
            throw new IllegalArgumentException("Invalid line: " + line);
        }
    }
    
    private String parse(String token) {
        if (token.trim().isEmpty() || token.trim().equals(",")) {
            return "-";
        } else {
            return token.replaceAll(",", "\\,")
                    .replace("\"", "\\\"");
        }
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 79 * hash + Objects.hashCode(this.country);
        hash = 79 * hash + Objects.hashCode(this.state);
        hash = 79 * hash + Objects.hashCode(this.city);
        hash = 79 * hash + Objects.hashCode(this.lat);
        hash = 79 * hash + Objects.hashCode(this.lng);
        hash = 79 * hash + Objects.hashCode(this.isp);
        hash = 79 * hash + Objects.hashCode(this.userAgent);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Line other = (Line) obj;
        if (!Objects.equals(this.country, other.country)) {
            return false;
        }
        if (!Objects.equals(this.state, other.state)) {
            return false;
        }
        if (!Objects.equals(this.city, other.city)) {
            return false;
        }
        if (!Objects.equals(this.lat, other.lat)) {
            return false;
        }
        if (!Objects.equals(this.lng, other.lng)) {
            return false;
        }
        if (!Objects.equals(this.isp, other.isp)) {
            return false;
        }
        if (!Objects.equals(this.userAgent, other.userAgent)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return country + "," + state + "," + city + "," + lat + "," + lng + ","
                + isp + "," + browser + "," + browserVersion + "," + os;
    }
}
