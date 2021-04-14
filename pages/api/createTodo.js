import {table} from './utils/Airtable';

export default async (req, res) => {
    const body = req.body;
    const description = body.description;

    try{
        const createdRecords = await table.create([{
            fields: {description}}
        ]);
        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields,
        }

        res.status(200);
        res.json(createdRecord);
    }catch(err){
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
    
  };
  