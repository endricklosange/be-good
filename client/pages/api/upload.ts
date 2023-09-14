import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {

    const importDirectoryPath = `${process.cwd()}/public/import`;
    const exportDirectoryPath = `${process.cwd()}/public/export`;


    function readAllCSVFiles() {
        try {
            const csvFiles = fs.readdirSync(importDirectoryPath);
            const csvFileNames = csvFiles.filter((fileName) => {
                return path.extname(fileName).toLowerCase() === '.csv';
            });
            const allCSVData = [];
            for (const csvFileName of csvFileNames) {
                const filePath = path.join(importDirectoryPath, csvFileName);
                const jsonData = convertCSVtoJSON(filePath);
                if (jsonData) {
                    allCSVData.push(jsonData);
                }
                // move csv file to archive
                fs.renameSync(filePath, `${importDirectoryPath}/archive/${csvFileName}`);
            }

            if(allCSVData.length !== 0) {
                let timestamp = Date.now();
                fs.writeFileSync(`${exportDirectoryPath}/export_${timestamp}.json`, JSON.stringify(allCSVData, null, 2));
            }

            return allCSVData;
        } catch (error) {
            return res.status(200).json(error);
        }
    }

    function convertCSVtoJSON(filePath: string) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const csv = fileData.trim().split(';');
            let json: any = {};

            const [title, organizers, participants, location, start_at, end_at, start_time, end_time, description] = csv;

            json.subject = title;
            json.body = {
                contentType: 'HTML',
                content: description
            }
            
            json.start = {
                timezone: 'Europe/Paris',
                dateTime: convertDateFormat(start_at, start_time)
            }
            json.end = {
                timezone: 'Europe/Paris',
                dateTime: convertDateFormat(end_at, end_time)
            }
            if(location){
                json.location = {
                    displayName: location,
                }
            }
            
            json.attendees = [];
            participants.split(',').forEach(participant => {
                json.attendees.push({
                    emailAddress: {
                        address: participant
                    },
                    type: 'optional'
                })
            });

            json.organizer = [];
            organizers.split(',').forEach(organizer => {
                json.organizer.push({
                    emailAddress: {
                        address: organizer
                    },
                    type: 'required'
                });
            });

            return json;
        } catch (error) {
            return res.status(200).json(error);
        }
    }

    function convertDateFormat(date: string, time: string) {
        let year: number = 0;
        let month: number = 0;
        let day: number = 0;
        let hour: number = 0;
        let minute: number = 0;

        // time hh:mm
        if(time.split(':').length === 2) {
            [hour, minute] = time.split(':').map(Number);
        }

        // time yyyy-mm-dd hh:mm:ss
        if(time.split('-').length === 3 && time.split(':').length === 3) {
            [hour, minute] = time.split(' ')[1].split(':').map(Number);
        }

         // date dd/mm/yyyy
         if(date.split('/').length === 3) {
            [day, month, year] = date.split('/').map(Number);
        }

        // date yyyy-mm-dd hh:mm:ss
        if(date.split('-').length === 3 && date.split(':').length === 3) {
            [year, month, day] = date.split(' ')[0].split('-').map(Number);
        }
        return new Date(year, month - 1, day, hour, minute);
    }

    res.status(200).json(readAllCSVFiles());
}