package com.example.ecowear.dto;

public class ShippingRequest {
    private String sellerAddress;
    private String clientAddress;
    private double packageWeight;

    public ShippingRequest() {
    }

    public ShippingRequest(String sellerAddress, String clientAddress, double packageWeight) {
        this.sellerAddress = sellerAddress;
        this.clientAddress = clientAddress;
        this.packageWeight = packageWeight;
    }

    public String getSellerAddress() {
        return sellerAddress;
    }

    public void setSellerAddress(String sellerAddress) {
        this.sellerAddress = sellerAddress;
    }

    public String getClientAddress() {
        return clientAddress;
    }

    public void setClientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
    }

    public double getPackageWeight() {
        return packageWeight;
    }

    public void setPackageWeight(double packageWeight) {
        this.packageWeight = packageWeight;
    }
}
