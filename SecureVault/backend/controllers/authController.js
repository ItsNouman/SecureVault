import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';


export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.json({success:false,message:'Missing details'})
  }
  try {
    const existingUser= await userModel.findOne({email});

    if(existingUser){
        return res.json({success:false,message:"user already exists"});
    }
    const hashedPassword= await bcrypt.hash(password,10);  

    const user=new userModel({name,email,password:hashedPassword});
    await user.save();

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7 * 24 * 60 * 60 * 1000
    });

    const mailOptions={
        from:process.env.GMAIL_USER,
        to:user.email,
        subject:'welcome to securevault',
        text:`welcome to securevault website, your account has been created succesfully with this email:${email}`
    }
    await transporter.sendMail(mailOptions);

    return res.status(201).json({ success:true, message: "User registered successfully" });
     
  } catch (err) {
    res.status(500).json({success:false, message:err.message});
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.json({success:false,message:'email and password are required'});
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({ success:true,message: "User logged in successfully" });
  } catch (err) {
    res.status(500).json({ success:false,message: "Server error" });
  }
};



export const logout = async (req, res) => {
  try {
    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    });

    return res.status(201).json({ success:true,message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ success:false,message: "Server error" });
  }
};



export const sendVerifyOtp= async(req,res)=>{
  try{
    const {userId}=req.body;
    const user= await userModel.findById(userId);

    if(user.isAccountVerified){
      return res.json({success:false,message:'Account already verified'});
    }
    const otp=String(Math.floor(100000+Math.random()*900000));
    user.verifyOtp=otp;
    user.verifyOtpExpireAt=Date.now()+15*60*1000;
    await user.save();

    const mailOption={
      from:process.env.GMAIL_USER,
      to:user.email,
      subject:'Account Verification otp',
      text:`your otp is ${otp}. verify your account with this otp`
    }
    await transporter.sendMail(mailOption);

    return res.status(201).json({ success:true, message: "verification otp sent on email successfully" });

  }
  catch(err){
    return res.status(500).json({success:false,message:"server error"});
  }
}



export const verifyEmail= async(req,res)=>{
  const {userId,otp}=req.body;
  if(!userId || !otp){
    return res.json({success:false,message:'missing details'});
  }
  try{
    const user=await userModel.findById(userId);

    if(!user){
      return res.json({success:false,message:'User not found'});
    }
    if(user.verifyOtp==='' || user.verifyOtp!==otp){
      return res.json({success:false,message:'invlaid otp'});
    }

    if(user.verifyOtpExpireAt<Date.now()){
      return res.json({success:false,message:'otp expired'});
    }

    user.isAccountVerified=true;
    user.verifyOtp='';
    user.verifyOtpExpireAt=0;

    await user.save();

    return res.json({success:true,message:'email verified successfully'});
  }
  catch(err){
    res.status(500).json({success:false, message: "Server error" });
  }
}

export const isAuthenticated=async(req,res)=>{
  try{
    return res.json({success:true});
  }
  catch(err){
      res.status(500).json({success:false, message: "Server error" });
  }
}

export const sendResetOtp=async(req,res)=>{
  const {email}=req.body;
  if(!email){
    return res.json({success:false,message:'email is required'});
  }
  try{
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:'User not found'});
    }
    const otp=String(Math.floor(100000+Math.random()*900000));
    user.resetOtp=otp;
    user.resetOtpExpireAt=Date.now()+15*60*1000;
    await user.save();

    const mailOption={
      from:process.env.GMAIL_USER,
      to:user.email,
      subject:'password  reset otp',
      text:`your otp is ${otp}. reset your password with this otp`
    }
    await transporter.sendMail(mailOption);

    return res.status(201).json({ success:true, message: "otp sent to your email account" });
  }
  catch(err){
    res.status(500).json({success:false, message: "Server error" });
  }
}

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: 'Email, OTP, and new password are required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    if (user.resetOtp==="" || user.resetOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }
    if(user.resetOtpExpireAt < Date.now()){
      return res.json({ success: false, message: ' OTP is expired' });
    }

    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.resetOtp='';
    user.resetOtpExpireAt=0;

    await user.save();
    return res.status(201).json({ success:true, message: "password has been reset succesfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
