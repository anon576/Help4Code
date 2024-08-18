import pool from '../Database/Database.js'

class CourseHandler{



    static fetchSideBarContect = async (req, res) => {
        const { course_name } =  req.params;
        console.log(course_name)
        try {
            // Fetch the course_id using the course_name
            const [courseResult] = await pool.query(
                `SELECT course_id FROM Course WHERE course_name = ?`,
                [course_name]
            );
    
            if (courseResult.length === 0) {
                return res.status(404).json({ message: 'Course not found' });
            }
    
            const course_id = courseResult[0].course_id;
    
            // Fetch all chapters and their corresponding subchapters for the given course_id
            const [rows] = await pool.query(
                `SELECT 
                    c.chapter_id, 
                    c.title as chapter_title, 
                    sc.sub_chapter_id, 
                    sc.title as sub_chapter_title, 
                    sc.content 
                FROM 
                    Chapter c 
                LEFT JOIN 
                    SubChapter sc 
                ON 
                    c.chapter_id = sc.chapter_id
                WHERE 
                    c.course_id = ?`,
                [course_id]
            );
    
            // Structure the data in a hierarchical format
            const chapters = rows.reduce((acc, row) => {
                const { chapter_id, chapter_title, sub_chapter_id, sub_chapter_title, content } = row;
    
                // Find if the chapter already exists in the accumulator
                let chapter = acc.find(ch => ch.chapter_id === chapter_id);
    
                if (!chapter) {
                    chapter = {
                        chapter_id,
                        chapter_title,
                        sub_chapters: [],
                    };
                    acc.push(chapter);
                }
    
                if (sub_chapter_id) {
                    chapter.sub_chapters.push({
                        sub_chapter_id,
                        sub_chapter_title,
                        content,
                    });
                }
    
                return acc;
            }, []);
    
            res.status(200).json({ chapters });
        } catch (error) {
            console.error('Error fetching sidebar content:', error);
            res.status(500).json({ message: 'Error fetching sidebar content' });
        }
    };


    static fetchContent = async (req, res) => {
        try {
            const { sub_chapter_id } = req.body;
    
            if (!sub_chapter_id) {
                return res.status(400).json({
                    message: "SubChapter ID is required",
                });
            }
    
            // Fetch the details of the subchapter with the given sub_chapter_id
            const [subChapter] = await pool.query(
                "SELECT * FROM SubChapter WHERE sub_chapter_id = ?",
                [sub_chapter_id]
            );
    
            if (!subChapter.length) {
                return res.status(404).json({
                    message: "SubChapter not found",
                });
            }
    
            return res.status(200).json({
                message: "SubChapter details fetched successfully",
                subChapter: subChapter[0],
            });
        } catch (error) {
            console.error("Error fetching SubChapter details:", error.message);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };
    


}

export default CourseHandler