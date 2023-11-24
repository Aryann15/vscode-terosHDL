// This code only can be used for Quartus boards
import { Database } from 'sqlite3';
import { TaskStateManager } from '../taskState';
import { e_taskState, e_taskType } from '../common';

const taskNameInBBDD: Record<string, e_taskType> = {
    "Full Compilation": e_taskType.QUARTUS_COMPILEDESIGN,
    "IP Generation Tool": e_taskType.QUARTUS_IPGENERATION,
    "Analysis & Synthesis": e_taskType.QUARTUS_ANALYSISSYNTHESIS,
    "Analysis & Elaboration": e_taskType.QUARTUS_ANALYSISELABORATION,
    "Synthesis": e_taskType.QUARTUS_SYNTHESIS,
    "none1": e_taskType.QUARTUS_EARLYTIMINGANALYSIS,
    "Fitter": e_taskType.QUARTUS_FITTER,
    "none2": e_taskType.QUARTUS_FITTERIMPLEMENT,
    "Plan": e_taskType.QUARTUS_PLAN,
    "Place": e_taskType.QUARTUS_PLACE,
    "Route": e_taskType.QUARTUS_ROUTE,
    "Fitter (Finalize)": e_taskType.QUARTUS_FITTERFINALIZE,
    "none3": e_taskType.QUARTUS_TIMING,
};

export async function setStatus(taskManager: TaskStateManager, bbddPath: string): Promise<void> {
    const db = new Database(bbddPath, (err) => {
        if (err) {
            const taskToClean = Object.values(e_taskType);
            for (const task of taskToClean) {
                taskManager.updateTask(task, e_taskState.IDLE, undefined, undefined, undefined);
            }
        }
    });

    await db.serialize(async () => {
        const taskToClean = Object.values(e_taskType);
        await db.each('SELECT * FROM status', (err, row: any) => {
            if (err) {
                const taskToClean = Object.values(e_taskType);
                for (const task of taskToClean) {
                    taskManager.updateTask(task, e_taskState.IDLE, undefined, undefined, undefined);
                }
            } else {
                const status = row.status === "done" ? e_taskState.FINISHED : e_taskState.RUNNING;
                const percent = parseInt(row.percent);
                const success = row.success === 1;
                const elapsed_time = parseInt(row.elapsed_time);

                const name = row.name;
                if (name in taskNameInBBDD) {
                    const taskType = taskNameInBBDD[name];
                    if (taskToClean.includes(taskType)) {
                        taskToClean.splice(taskToClean.indexOf(taskType), 1);
                    }
                    taskManager.updateTask(taskType, status, percent, success, elapsed_time);
                }
            }
        });
        for (const task of taskToClean) {
            taskManager.updateTask(task, e_taskState.IDLE, undefined, undefined, undefined);
        }
    });


    await db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conexión a la base de datos cerrada');
    });
}