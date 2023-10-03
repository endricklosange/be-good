import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    }
};

type ProcessedFiles = Array<[string, File]>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files: ProcessedFiles = [];
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => {
        });
    }).catch(e => {
        res.status(500).json(e);
    });

    let logs = [];
    if (files?.length) {
        const targetPath = path.join(process.cwd(), `/public/import/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }
        for (const file of files) {
            const tempPath = file[1].filepath;
            let timestamp = Date.now();
            const ext = file[1].mimetype;
            if(ext === "text/csv") {
                await fs.copyFile(tempPath, targetPath + "import_" + timestamp + ".csv");
                logs.push({"file": file[1].originalFilename, "status": "success"});
            } else {
                logs.push({"file": file[1].originalFilename, "status": "error", "message": "Le fichier n'est pas au format CSV"})
            }
        }
    }
    return res.status(200).json(logs);
}