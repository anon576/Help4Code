import pool from '../../Database/Database.js'

class AdminCourseHandler{
    static addCourse = async (req, res) => {
        try {
            const { course_name, course_introduction } = req.body;
            const course_img = req.file; // Multer stores the file object here
    
            if (!course_name) {
                return res.status(400).json({ message: "Course name is required" });
            }
    
            // Check if course with the same name already exists
            const [existingCourses] = await pool.query(
                "SELECT course_id FROM Course WHERE course_name = ?",
                [course_name]
            );
    
            if (existingCourses.length > 0) {
                return res.status(400).json({ message: "Course with this name already exists" });
            }
    
            // If there's an image, convert it to a buffer
            const imgBuffer = course_img ? course_img.buffer : null;
    
            // Insert into the database
            const [result] = await pool.query(
                "INSERT INTO Course (course_name, course_introduction, course_img) VALUES (?, ?, ?)",
                [course_name, course_introduction, imgBuffer]
            );
    
            if (result.affectedRows === 1) {
                return res.status(201).json({
                    message: "Course added successfully",
                    course_id: result.insertId,
                });
            } else {
                return res.status(500).json({ message: "Failed to add course" });
            }
        } catch (error) {
            console.error("Error adding course:", error.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    


    static addCourseChapter = async (req, res) => {
        try {
            const { course_id, chapter_title } = req.body;
           
            if (!course_id || !chapter_title) {
                return res.status(400).json({
                    message: "Course ID and chapter title are required",
                });
            }
    
            // Check if the course exists
            const [course] = await pool.query(
                "SELECT course_id FROM Course WHERE course_id = ?",
                [course_id]
            );
                console.log(course)
            if (!course.length) {
                return res.status(404).json({
                    message: "Course not found",
                });
            }

            const [existingChapter] = await pool.query(
                "SELECT * FROM Chapter WHERE title = ? AND course_id = ?",
                [chapter_title, course_id]
            );
    
            if (existingChapter.length) {
                return res.status(409).json({
                    message: "Chapter with the same title already exists for this course",
                });
            }
    
            // Insert the new chapter into the database
            const [result] = await pool.query(
                "INSERT INTO Chapter (title, course_id) VALUES (?, ?)",
                [chapter_title, course_id]
            );
    
            return res.status(201).json({
                message: "Chapter added successfully",
                chapter_id: result.insertId, // Return the newly created chapter ID
                course_id: course_id,
                chapter_title: chapter_title,
            });
        } catch (error) {
            console.error("Error adding chapter:", error.message);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };
    
    


    static fetchCourseChapter = async (req, res) => {
        try {
            const { course_id } = req.query;
    
            if (!course_id) {
                return res.status(400).json({
                    message: "Something went wrong",
                });
            }
            
            // Fetch the course ID using the course name
            const [course] = await pool.query(
                "SELECT course_id FROM Course WHERE course_id = ?",
                [course_id]
            );
    
            if (!course.length) {
                return res.status(404).json({
                    message: "Course not found",
                });
            }
       
            const courseId = course[0].course_id;
    
            // Fetch the chapters of the course using the course ID
            const [chapters] = await pool.query(
                "SELECT * FROM Chapter WHERE course_id = ?",
                [courseId]
            );
            console.log(chapters)
            return res.status(200).json({
                message: "Chapters fetched successfully",
                course_id: courseId, // Include the course_id in the response
                chapters: chapters,
            });
        } catch (error) {
            console.error("Error fetching course chapters:", error.message);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };
    
    static updateCourseChapter = async (req, res) => {
        try {
            const { chapter_id, course_id, title } = req.body;
            console.log("here")
            if (!chapter_id || !course_id || !title) {
                return res.status(400).json({
                    message: "Chapter ID, course ID, and title are required",
                });
            }
    
            // Check if the course exists
            const [course] = await pool.query(
                "SELECT course_id FROM Course WHERE course_id = ?",
                [course_id]
            );
    
            if (!course.length) {
                return res.status(404).json({
                    message: "Course not found",
                });
            }
    
            // Check if the chapter exists for the given course
            const [chapter] = await pool.query(
                "SELECT * FROM Chapter WHERE chapter_id = ? AND course_id = ?",
                [chapter_id, course_id]
            );
    
            if (!chapter.length) {
                return res.status(404).json({
                    message: "Chapter not found",
                });
            }
    
            // Update the chapter title
            await pool.query(
                "UPDATE Chapter SET title = ? WHERE chapter_id = ? AND course_id = ?",
                [title, chapter_id, course_id]
            );
    
            return res.status(200).json({
                message: "Chapter updated successfully",
                chapter_id: chapter_id,
                course_id: course_id,
                updated_title: title,
            });
        } catch (error) {
            console.error("Error updating chapter:", error.message);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };
    
    static deleteCourseChapter = async (req, res) => {
        const { chapter_id } = req.params; // Assuming chapter_id is passed as a URL parameter
    
        try {
            // Check if the chapter exists
            const [rows] = await pool.query('SELECT * FROM Chapter WHERE chapter_id = ?', [chapter_id]);
            
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Chapter not found' });
            }
    
            // Delete the chapter
            await pool.query('DELETE FROM Chapter WHERE chapter_id = ?', [chapter_id]);
    
            return res.status(200).json({ message: 'Chapter deleted successfully' });
        } catch (error) {
            console.error('Error deleting chapter:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
    
    
    
}

export default AdminCourseHandler