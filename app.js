// paketler
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");


// express uygulaması
const app = express();

// MongoDB bağlantı URI'si
const dbURI =
  "mongodb+srv://baran:582059uyB+@baran.qqib7aw.mongodb.net/?appName=baran";

// veritabanına bağlan ve ardından server'ı başlat
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("connected to db");
    app.listen(3000); // bağlantı başarılı olursa port 3000'de dinle
  })
  .catch((err) => {
    console.log("db error:", err);
  });

// view engine ayarları
app.set("view engine", "ejs");   // EJS template motoru kullan
app.set("views", path.join(__dirname, "views"));    // view dosyaları mevcut klasörde

// middleware'ler
app.use(express.static("public"));              // public klasörünü statik servis et
app.use(express.urlencoded({ extended: true })); // form verilerini parse et
app.use(morgan("dev"));                        // istek loglama

// ana sayfa -> /blogs'e yönlendir
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// about sayfası
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog rotaları (tüm /blogs yolları için)
app.use("/blogs", blogRoutes);

// 404 sayfası (diğer tüm rotalar için)
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
