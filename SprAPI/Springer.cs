using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using static System.Net.Mime.MediaTypeNames;

namespace SpringerCode
{
    public class SpringerMove
    {
        public int[] xMoves = { -1, 1, 2, 2, 1, -1, -2, -2 };
        public int[] yMoves = { 2, 2, 1, -1, -2, -2, -1, 1 };
        public List<int> path = new List<int>();

        public bool GetTheWay(int[,] field, int stepNum, int[,] visited, int inpX_s, int inpY_s, int inpX_f, int inpY_f)
        {
            int freeSteps = inpX_f * inpY_f;

            if (stepNum == freeSteps - 1)
            {

                foreach (int step in visited)
                {
                    path.Add(step);
                }

                foreach (int p in path)
                {
                    Console.Write($"{p} ");
                }

                return true;
            }

            for (int i = 0; i < 8; i++)
            {
                int testX = inpX_s + xMoves[i];
                int testY = inpY_s + yMoves[i];

                if (inpX_f > testX && testX >= 0 && inpY_f > testY && testY >= 0 && visited[testX, testY] == -1) 
                {   
                    stepNum++;
                    visited[testX, testY] = stepNum;

                    if (GetTheWay(field, stepNum, visited, testX, testY, inpY_f, inpX_f))
                    {
                        //path.Add(stepNum);
                        return true;
                    }
                    else
                    {
                        stepNum--;
                        path.Remove(stepNum - 1);
                        visited[testX, testY] = -1;
                    }
                }
            }
            return false;
        }
    }
}