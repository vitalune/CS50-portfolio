import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        level: true,
        currentXP: true,
        xpForNextLevel: true,
        strength: true,
        endurance: true,
        intelligence: true,
        discipline: true,
        profilePicture: true,
        joinDate: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      level,
      currentXP,
      xpForNextLevel,
      strength,
      endurance,
      intelligence,
      discipline,
      profilePicture,
      username,
    } = await request.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...(level !== undefined && { level }),
        ...(currentXP !== undefined && { currentXP }),
        ...(xpForNextLevel !== undefined && { xpForNextLevel }),
        ...(strength !== undefined && { strength }),
        ...(endurance !== undefined && { endurance }),
        ...(intelligence !== undefined && { intelligence }),
        ...(discipline !== undefined && { discipline }),
        ...(profilePicture !== undefined && { profilePicture }),
        ...(username !== undefined && { username }),
      },
      select: {
        id: true,
        email: true,
        username: true,
        level: true,
        currentXP: true,
        xpForNextLevel: true,
        strength: true,
        endurance: true,
        intelligence: true,
        discipline: true,
        profilePicture: true,
        joinDate: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}