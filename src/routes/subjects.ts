import { and, desc, eq, getTableColumns, ilike, or, sql } from 'drizzle-orm';
import express from 'express';
import { subjects, grades } from '../db/schema';
import { db } from '../db';

const router = express.Router();

// GET all subjects
router.get('/', async (req, res) => {
    try {
        const { search, grade, page = 1, limit = 10 } = req.query;


        const currentPage = Math.max(1, +page);
        const limitPerPage = Math.max(1, +limit);

        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];

        // if search is provided, add a condition for searching by name
        if (search) {
            filterConditions.push(
                or(
                    ilike(subjects.name, `%${search}%`),
                    ilike(subjects.code, `%${search}%`)
                )
            );
        }

        // if grade is provided, add a condition for filtering by grade
        if (grade) {
            filterConditions.push(ilike(grades.name, `%${grade}%`));
        }

        // combine all conditions using AND
        const whereClause = filterConditions.length > 0 ? and(...filterConditions) : undefined;

        const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(subjects)
        .leftJoin(grades, eq(subjects.gradeId, grades.id))
        .where(whereClause)

        const totalCount = countResult[0]?.count ?? 0;

        const subjectsList = await db.select({ ...getTableColumns(subjects), grade: { ...getTableColumns(grades) } })
            .from(subjects)
            .leftJoin(grades, eq(subjects.gradeId, grades.id))
            .where(whereClause)
            .orderBy(desc(subjects.createdAt))
            .limit(limitPerPage)
            .offset(offset);

        res.status(200).json({
             subjects: subjectsList, totalCount,
             pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limitPerPage)
             }
            });

    } catch (error) {
        console.log('Error retrieving subjects:', error);
        res.status(500).json({ error: 'Failed to retrieve subjects' });
    }
});



// // GET subject by id
// router.get('/:id', (req, res) => {
//     res.json({ message: `Get subject ${req.params.id}` });
// });

// // POST create subject
// router.post('/', (req, res) => {
//     res.json({ message: 'Create subject' });
// });

// // PUT update subject
// router.put('/:id', (req, res) => {
//     res.json({ message: `Update subject ${req.params.id}` });
// });

// // DELETE subject
// router.delete('/:id', (req, res) => {
//     res.json({ message: `Delete subject ${req.params.id}` });
// });

export default router;