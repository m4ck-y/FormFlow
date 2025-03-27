import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    User,
} from "@heroui/react";
import React from "react";
const MenuProfile: React.FC = () => {
    return (
        <Dropdown placement="bottom-end" showArrow>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    getInitials={(name) => name.charAt(0)}
                    showFallback
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem
                    key="profile"
                    isReadOnly
                    className=" gap-2 opacity-100"
                >
                    <User
                        avatarProps={{
                            size: "lg",
                            className:"w-14 h-14 text-large",
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        }}
                        classNames={{
                            name: "text-default-600",
                            description: "text-default-500",
                        }}
                        description="@jrgarciadev"
                        name="Junior Garcia"
                    />
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger">
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default MenuProfile;
