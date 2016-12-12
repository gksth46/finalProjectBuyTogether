package com.buy.together.domain;

import java.util.Date;

public class User {

   private int user_number;
   private String id;
   private String pw;
   private String name;
   private String email;
   private String phone_number;
   private Date birthdate;
   private String gender;
   private String nickName;
   private String profile;
   private String region;
   private int reputation;

   public User() {

   }

   public int getUser_number() {
      return user_number;
   }

   public void setUser_number(int user_number) {
      this.user_number = user_number;
   }

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public String getPw() {
      return pw;
   }

   public void setPw(String pw) {
      this.pw = pw;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getPhone_number() {
      return phone_number;
   }

   public void setPhone_number(String phone_number) {
      this.phone_number = phone_number;
   }

   public Date getBirthdate() {
      return birthdate;
   }

   public void setBirthdate(Date birthdate) {
      this.birthdate = birthdate;
   }

   public String getGender() {
      return gender;
   }

   public void setGender(String gender) {
      this.gender = gender;
   }

   public String getNickName() {
      return nickName;
   }

   public void setNickName(String nickName) {
      this.nickName = nickName;
   }

   public String getProfile() {
      return profile;
   }

   public void setProfile(String profile) {
      this.profile = profile;
   }

   public String getRegion() {
      return region;
   }

   public void setRegion(String region) {
      this.region = region;
   }

   public int getReputation() {
      return reputation;
   }

   public void setReputation(int reputation) {
      this.reputation = reputation;
   }

}