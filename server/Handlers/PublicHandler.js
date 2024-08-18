import pool from '../Database/Database.js'

class PublicHandler{
    static fetchCourse = async (req, res) => {
        try {
            const [courses] = await pool.query("SELECT * FROM Course");
    
            // Convert LONGBLOB to base64
            const coursesWithImages = courses.map(course => {
                return {
                    ...course,
                    course_img: course.course_img ? `data:image/jpeg;base64,${course.course_img.toString('base64')}` : null
                };
            });
    
            res.status(200).json({
                message: "Courses fetched successfully",
                data: coursesWithImages
            });
        } catch (error) {
            console.error("Error fetching courses:", error.message);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    
}

export default PublicHandler