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
            int[,] field = new int[inpX_f, inpY_f];
            field[inpX_s, inpY_s] = 1;

            for (int x = 0; x < field.GetLength(0); x++)
            {
                for (int y = 0; y < field.GetLength(1); y++)
                {
                    if (inpX_s == x && inpY_s == y)
                    {
                        field[x, y] = 1;
                        Console.Write(field[x, y]);
                    }
                    else
                    {
                        field[x, y] = 0;
                        Console.Write(field[x, y]);
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
                Console.Write($"Der Springer hat den Weg in {field.GetLength(0) * field.GetLength(1)} Schritte gefunden");
                Console.WriteLine(" ");
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
                        Console.Write(field[testY, testX]);
                        Console.WriteLine(" ");
                        //int schritte = testX * testY;
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

/*namespace SpringerCode
{
    class SpringerMove
    {
        public static void FreeStepsFromStart(int inpX_f, int inpY_f, int inpX_s, int inpY_s)
        {
            int[,] field = new int[inpX_f, inpY_f];
            field[inpX_s, inpY_s] = 1;

            for (int x = 0; x < field.GetLength(0); x++)
            {
                for (int y = 0; y < field.GetLength(1); y++)
                {
                    if (inpX_s == x && inpY_s == y)
                    {
                        field[x, y] = 1;
                        Console.Write(field[x, y]);
                    }
                    else
                    {
                        field[x, y] = 0;
                        Console.Write(field[x, y]);
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
                        for (int l = 0; l < field.GetLength(0); l++)
                        {
                            for (int b = 0; b < field.GetLength(1); b++)
                            {
                                Console.Write(field[l, b] + " ");
                            }
                        }
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
}*/