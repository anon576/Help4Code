import pool from '../../Database/Database.js'


class AdminTopicHandler{
    static fetchTopics = async (req, res) => {
        try {
            const { chapter_id } = req.query;
    
            if (!chapter_id) {
                return res.status(400).json({
                    message: "Chapter ID is required",
                });
            }
    
            // Fetch all topics (sub-chapters) for the given chapter_id
            const [topics] = await pool.query(
                "SELECT sub_chapter_id, title, content FROM SubChapter WHERE chapter_id = ?",
                [chapter_id]
            );
    
            if (!topics.length) {
                return res.status(404).json({
                    message: "No topics found for the given chapter ID",
                });
            }
    
            return res.status(200).json({
                message: "Topics fetched successfully",
                topics: topics,
            });
        } catch (error) {
            console.error("Error fetching topics:", error.message);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };

    static AddTopic = async (req, res) => {
        try {
            const { chapter_id, title, content } = req.body;
            console.log("here")
            // Validate input
            if (!chapter_id || !title || !content) {
                return res.status(400).json({
                    message: "Chapter ID, title, and content are required",
                });
            }
    
            // Check if the chapter exists
            const [chapter] = await pool.query(
                "SELECT chapter_id FROM Chapter WHERE chapter_id = ?",
                [chapter_id]
            );
    
            if (!chapter.length) {
                return res.status(404).json({
                    message: "Chapter not found",
                });
            }
    
            // Insert the new topic into SubChapter table
            const [result] = await pool.query(
                "INSERT INTO SubChapter (title, content, chapter_id) VALUES (?, ?, ?)",
                [title, content, chapter_id]
            );
    
            // Respond with success
            return res.status(201).json({
                message: "Topic added successfully",
                sub_chapter_id: result.insertId, // Return the ID of the newly inserted topic
                title: title,
                content: content,
                chapter_id: chapter_id,
            });
        } catch (error) {
            console.error("Error adding topic:", error.message);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };


    static updateTopic = async (req, res) => {
        try {
            const { sub_chapter_id, title, content } = req.body;
    
            // Validate the input
            if (!sub_chapter_id || !title || !content) {
                return res.status(400).json({
                    message: "Sub-chapter ID, title, and content are required",
                });
            }
    
            // Check if the topic exists
            const [subChapter] = await pool.query(
                "SELECT * FROM SubChapter WHERE sub_chapter_id = ?",
                [sub_chapter_id]
            );
    
            if (!subChapter.length) {
                return res.status(404).json({
                    message: "Sub-chapter not found",
                });
            }
    
            // Update the topic
            await pool.query(
                "UPDATE SubChapter SET title = ?, content = ? WHERE sub_chapter_id = ?",
                [title, content, sub_chapter_id]
            );
    
            return res.status(200).json({
                message: "Sub-chapter updated successfully",
                sub_chapter_id,
                updated_title: title,
                updated_content: content,
            });
        } catch (error) {
            console.error("Error updating topic:", error.message);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };
    
    
    
}

export default AdminTopicHandler