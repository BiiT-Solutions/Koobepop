import { Injectable } from '@angular/core';
import { USMOTask } from '../../models/usmo-task';
import { TasksManager } from '../tasksManager/tasksManager';

@Injectable()
export class TaskSyncronizationProvider {

  constructor(private taskManager: TasksManager) {
  }


  //Sync algorithm
  public syncTaskList(remoteTasks: USMOTask[], localTasks: USMOTask[]): USMOTask[] {
    console.log('Sync tasks', remoteTasks, localTasks)
    let finalTasks = []
    for (let remoteTask of remoteTasks) {
      let taskIsAlreadySaved = false;
      let finalTask = remoteTask
      for (let localTask of localTasks) {
        if (localTask.comparationId == remoteTask.comparationId) {
          taskIsAlreadySaved = true;
          //console.log('Tasks 1->',localTasks)
          finalTask = this.syncLocalTask(remoteTask, localTask);
          //console.log('Tasks 2->', localTasks)
          //Exit the loop we already found it
          break;
        }
      }
      finalTasks.push(finalTask);
    }

    console.log('new localTasks', localTasks)
    return finalTasks;
  }

  /** 
   * Syncronizes the local task to get changes to the tasks made by USMO
   */
  public syncLocalTask(remoteTask: USMOTask, localTask: USMOTask): USMOTask {
    localTask.startTime = remoteTask.startTime;
    localTask.finishTime = remoteTask.finishTime;
    localTask.repetitions = remoteTask.repetitions;
    return localTask;
  }


  public syncServerTasks(remoteTasks: USMOTask[], localTasks:USMOTask[]) {
    for (let remoteTask of remoteTasks) {
      let taskIsAlreadySaved = false;
      for (let localTask of localTasks) {
        if (localTask.comparationId == remoteTask.comparationId) {
          taskIsAlreadySaved = true;
          this.taskActions(remoteTask, localTask)
          break;
        }
      }
    }
    this.taskManager.sendStagedActions()
    .subscribe(isSent => console.log(isSent ? 'Tasks sent' : 'Error sending tasks'))
  }

  public taskActions(remoteTask: USMOTask, localTask: USMOTask) {
    //Tasks in remote and not local
    let differenceRemoteLocal = remoteTask.performedOn.filter(x => !localTask.performedOn.find(y => y.performedTime == x.performedTime))
    //Tasks in local and not remote
    let differenceLocalRemote = localTask.performedOn.filter(y => !remoteTask.performedOn.find(x => x.performedTime == y.performedTime))

    //console.log("Differences local-remote remote-local ",localTask.name,differenceLocalRemote,differenceRemoteLocal);
    for (let taskPerformed of differenceRemoteLocal) {
      this.taskManager.unfinishTask(localTask.comparationId, localTask.name, taskPerformed)
    }
    for (let taskPerformed of differenceLocalRemote) {
      this.taskManager.finishTask(localTask.comparationId, localTask.name, taskPerformed)
    }
  }
}
