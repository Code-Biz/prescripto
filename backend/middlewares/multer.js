import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage });

export default upload





/*

1.React/Frontend → sends a file
2.Multer → catches it, parses it, and stores it properly
3.Controller → can now use that file info to save to DB or folder
 

multer.diskStorage({...}) → tells Multer how to save uploaded files.
filename: function(...) → says how to name the file on the server.
callback(null, file.originalname) → “save the file with its original name.”
null = no error
file.originalname = keeps original filename
*/