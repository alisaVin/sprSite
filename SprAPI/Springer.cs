using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using static System.Net.Mime.MediaTypeNames;

namespace SpringerCode
{
    class SpringerMove
    {
        public static void FreeStepsFromStart(int inpX_f, int inpY_f, int inpX_s, int inpY_s)
        {
            int[,] field = new int[inpY_f, inpX_f];
            field[inpY_s, inpX_s] = 1;

            for (int y = 0; y < field.GetLength(0); y++)
            {
                for (int x = 0; x < field.GetLength(1); x++)
                {
                    if (inpX_s == x && inpY_s == y)
                    {
                        field[y, x] = 1;
                        Console.Write(field[y, x]);
                    }
                    else
                    {
                        field[y, x] = 0;
                        Console.Write(field[y, x]);
                    }
                }
            }
        }

        //mögliche Koordinaten
        public int[] xMoves = { -1, 1, 2, 2, 1, -1, -2, -2 };
        public int[] yMoves = { 2, 2, 1, -1, -2, -2, -1, 1 };

        public bool GetTheWay(int[,] field, int stepNum, int inpX_s, int inpY_s, int inpY_f, int inpX_f)
        { 
            int freeSteps = inpX_f * inpY_f - 1;

            //wenn alle Felder schon besucht waren
            if (stepNum == freeSteps)
            {
                Console.WriteLine(" ");
                Console.WriteLine("Das war der Weg!");
                return true;
            }

            for (int i = 0; i < 8; i++) 
            {
                int testX = inpX_s + xMoves[i];
                int testY = inpY_s + yMoves[i];

                if (inpX_f > testX && testX >= 0 && inpY_f > testY && testY >= 0)
                {
                    //outside the bounds
                    field[testX, testY] = stepNum + 1;

                    if (GetTheWay(field, stepNum + 1, testX, testY, inpY_f, inpX_f))                  
                    {
                        return true;
                    }
                    else
                    {
                        field[testX, testY] = 0;                             
                    }
                }
            }
            Console.WriteLine(" ");
            Console.WriteLine("Da ist kein Weg...");
            return false;
        }
    }   
}